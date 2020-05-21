/**
 * Basho data.
 */
const data = '{"basho_schedule": {"1": {"venue": "Kokugikan", "final_day": "2019-09-22", "month": 9, "description": "Aki Basho", "first_day": "2019-09-08", "year": 2019}, "2": {"venue": "Fukuoka Kokusai Center", "final_day": "2019-11-24", "month": 11, "description": "Ky\u016bsh\u016b Basho", "first_day": "2019-11-10", "year": 2019}, "3": {"venue": "Kokugikan", "final_day": "2020-01-26", "month": 1, "description": "Hatsu Basho", "first_day": "2020-01-12", "year": 2020}, "4": {"venue": "Osaka", "final_day": "2020-03-22", "month": 3, "description": "Haru Basho", "first_day": "2020-03-08", "year": 2020}, "6": {"venue": "Kokugikan", "final_day": "2020-08-02", "month": 7, "description": "Nagoya Basho", "first_day": "2020-07-19", "year": 2020}, "7": {"venue": "Kokugikan", "final_day": "2020-09-27", "month": 9, "description": "Aki Basho", "first_day": "2020-09-13", "year": 2020}, "8": {"venue": "Fukuoka Kokusai Center", "final_day": "2020-11-22", "month": 11, "description": "Ky\u016bsh\u016b Basho", "first_day": "2020-11-08", "year": 2020}, "9": {"year": 2019, "month": 1, "venue": "Kokugikan", "description": "Hatsu Basho", "first_day": "2019-01-13", "final_day": "2019-01-27"}, "10": {"year": 2019, "month": 3, "venue": "Osaka", "description": "Haru Basho", "first_day": "2019-03-10", "final_day": "2019-03-24"}, "11": {"year": 2019, "month": 5, "venue": "Kokugikan", "description": "Natsu Basho", "first_day": "2019-05-12", "final_day": "2019-05-26"}, "12": {"year": 2019, "month": 7, "venue": "Nagoya", "description": "Nagoya Basho", "first_day": "2019-07-07", "final_day": "2019-07-21"}, "13": {"year": 2021, "month": 1, "venue": "Kokugikan", "description": "Hatsu Basho", "first_day": "2021-01-10", "final_day": "2021-01-24"}, "14": {"year": 2021, "month": 3, "venue": "Osaka", "description": "Haru Basho", "first_day": "2021-03-14", "final_day": "2021-03-28"}}}';

/**
 * Creates a new Basho object.
 * 
 * @class
 * @param {string} description - The description of the basho (Hatsu, Haru, etc.).
 * @param {string} venue - The venue where the basho is held.
 * @param {string} firstDay - The first day of tha basho as an ISO date string.
 * @param {string} finalDay - The final day of tha basho as an ISO date string.
 * @param {string} prevBasho - The final day of the previous basho.
 * @param {boolean} started - True if the basho has already started, false otherwise.
 */
function Basho(description, venue, firstDay, finalDay, prevBashoFinalDay, started) {
    this.description = description;
    this.venue = venue;
    this.firstDay = firstDay;
    this.finalDay = finalDay;
    this.prevBashoFinalDay = prevBashoFinalDay;
    this.started = started;
}

/**
 * Get the next basho relative to the current date.
 * 
 * @param {number} currentDate - The current date in milliseconds since the epoch.
 * @returns {Object} An object with information about the next basho.
 */
export default function getNextBasho(currentDate) {
    // Parse the JSON string containing the basho schedules.
    // The JSON a Python TinyDB database file.
    let bashoDB = JSON.parse(data);

    let schedules = {}; // object for storing the schedules by date deltas
    let started = false; // is the basho already underway?
    let prevBashoDelta = -365;
    let prevBashoFinalDay = '';

    // Loop through the schedule entries and calculate the
    // date deltas. These will be used to decide which basho
    // will be the next one.
    for (let key in bashoDB.basho_schedule) {
        const bashoSchedule = bashoDB.basho_schedule[key];

        let firstDay = moment(bashoSchedule.first_day);
        let finalDay = moment(bashoSchedule.final_day);
        let dateDelta = firstDay.diff(currentDate, 'days');
        if (dateDelta > 0) {
            // Positive delta => the basho is in the future,
            // so add it to the dictionary.
            schedules[dateDelta] = bashoSchedule;
        } else {
            // Negative delta => the first day of the basho is
            // in the past.
            // If the final day is in the future then this basho
            // has already started.
            let finalDelta = finalDay.diff(currentDate, 'days');
            if (finalDelta >= 0) {
                started = true;
                schedules = {} // create a new empty object
                schedules[0] = bashoSchedule; // add only this element
                break;
            } else {
                if (finalDelta > prevBashoDelta) {
                    prevBashoDelta = finalDelta;
                    prevBashoFinalDay = bashoSchedule.final_day;
                }
            }
        }
    }

    // Get the key of schedule which is the nearest to the current date.
    let key = Math.min(...Object.keys(schedules));

    // Create an object with all the info about the next basho.
    return new Basho(
        schedules[key].description,
        schedules[key].venue,
        schedules[key].first_day,
        schedules[key].final_day,
        prevBashoFinalDay,
        started
    );
}
