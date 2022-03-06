import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
const N_COURSES = 15;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}


const courses = createCourses();

const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course Name'},
    {key: 'lecturer', displayName: 'Lecturer Name'},
    {key: 'cost', displayName: "Cost (ILS)"},
    {key: 'hours', displayName: "Course Duration (h)"}
], "courses-table", "sortCourses");
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);

function hideAll(){
    tableHandler.hideTable();
    formHandler.hide();
    tableCostHandler.hideTable();
    tableHoursHandler.hideTable();
}

window.showForm = () => {
    hideAll();
    formHandler.show();
}
window.showCourses = () => {
    hideAll();
    tableHandler.showTable(dataProcessor.getAllCourses());
}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key))
}

console.log(dataProcessor.getHoursStatistics(10));
console.log(dataProcessor.getCostStatistics(2000));


const tableHoursHandler = new TableHandler([
    {key: 'minInterval', displayName: 'minInterval'},
    {key: 'maxInterval', displayName: 'maxInterval'},
    {key: 'amount', displayName: 'amount'},
], "courses-table-data-hours");

window.showCoursesHoursData = () => {
    hideAll();
    tableHoursHandler.showTable(dataProcessor.getHoursStatistics(courseData.intervalHours));
}


const tableCostHandler = new TableHandler([
    {key: 'minInterval', displayName: 'minInterval'},
    {key: 'maxInterval', displayName: 'maxInterval'},
    {key: 'amount', displayName: 'amount'},
], "courses-table-data-cost");

window.showCoursesCostData = () => {
    hideAll();
    tableCostHandler.showTable(dataProcessor.getCostStatistics(courseData.intervalCost));
}
