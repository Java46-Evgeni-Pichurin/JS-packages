import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigators_buttons';

const formHandler = new FormHandler("courses-form", "alert");
const formHandlerGenerate = new FormHandler("generated-courses", "alert");
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course Name' },
    { key: 'lecturer', displayName: 'Lecturer Name' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Course Duration (h)" }
], "courses-table", "sortCourses", "removeCourse");
const tableStatisticHandler = new TableHandler([
    { key: 'minInterval', displayName: 'minInterval' },
    { key: 'maxInterval', displayName: 'maxInterval' },
    { key: 'amount', displayName: 'amount' },
], "courses-table");
const activeButton = new NavigatorButtons([`formButton`, `coursesButtun`, `hoursDataButton`, `costDataButton`, `generation`]);
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;
})
formHandlerGenerate.addHandlerGenerate(num => {
    function createCourses() {
        const courses = [];
        for (let i = 0; i < num; i++) {
            courses.push(getRandomCourse(courseData));
        }
        return courses;
    }
    const courses = createCourses();
    console.log(courses)
    const res = dataProcessor.addCourse(courses);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;
})

const dataProvider = new Courses(courseData.minId, courseData.maxId, courses); // Wrong!!!
const dataProcessor = new College(dataProvider, courseData);

formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);

function hideAll() {
    tableHandler.hideTable();
    formHandler.hide();
    tableStatisticHandler.hideTable();
    activeButton.setInActiveAll();
    formHandlerGenerate.hide();
}
window.showForm = () => {
    hideAll();
    formHandler.show();
    activeButton.setActive(0);
}
window.showCourses = () => {
    hideAll();
    tableHandler.showTable(dataProcessor.getAllCourses());
    activeButton.setActive(1);
}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key))
}
window.showCoursesHoursData = () => {
    hideAll();
    tableStatisticHandler.showTable(dataProcessor.getStatistics(courseData.intervalHours, `hours`));
    activeButton.setActive(2);
}
window.showCoursesCostData = () => {
    hideAll();
    tableStatisticHandler.showTable(dataProcessor.getStatistics(courseData.intervalCost, `cost`));
    activeButton.setActive(3);
}
window.removeCourse = (id) => {
    if (window.confirm(`You are going to remove course id: ${id}`)) {
        dataProcessor.removeCourse(+id);
        tableHandler.showTable(dataProcessor.getAllCourses());
    }
}
window.showGeneration = () => {
    hideAll();
    formHandlerGenerate.show();
    activeButton.setActive(4);
}
