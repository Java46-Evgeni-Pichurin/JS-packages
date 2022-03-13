import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigators_buttons';
import Spinner from './ui/spinner';

const dataProvider = new Courses(courseData.minId, courseData.maxId);
const dataProcessor = new College(dataProvider, courseData);
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
const spinner = new Spinner(`spinner`)
formHandler.addHandler(async course => {
    spinner.start();
    const res = await dataProcessor.addCourse(course);
    spinner.stop();
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;
})
formHandlerGenerate.addHandler(async generation => {
    const number = generation.number;
    if (number < 1) return `Wrong number of courses`;
    else {
        spinner.start();
        for (let i = 0; i < number; i++) {
            dataProcessor.addCourse(getRandomCourse(courseData)); //await N courses (How to fix)
        }
        spinner.stop();
    }
    return '';
})


formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);

function hideAll() {
    tableHandler.hideTable();
    formHandler.hide();
    tableStatisticHandler.hideTable();
    formHandlerGenerate.hide();
}
window.showForm = () => {
    hideAll();
    formHandler.show();
    activeButton.setActive(0);
}
window.showCourses = async () => {
    hideAll();
    spinner.start();
    activeButton.setActive(1);
    tableHandler.showTable(await dataProcessor.getAllCourses());
    spinner.stop();
}
window.sortCourses = async (key) => {
    spinner.start();
    tableHandler.showTable(await dataProcessor.sortCourses(key))
    spinner.stop();
}
window.showCoursesHoursData = async () => {
    hideAll();
    spinner.start();
    activeButton.setActive(2);
    tableStatisticHandler.showTable(await dataProcessor.getStatistics(courseData.intervalHours, `hours`));
    spinner.stop();
}
window.showCoursesCostData = async () => {
    hideAll();
    activeButton.setActive(3);
    spinner.start();
    tableStatisticHandler.showTable(await dataProcessor.getStatistics(courseData.intervalCost, `cost`));
    spinner.stop();
}
window.removeCourse = async (id) => {
    if (window.confirm(`You are going to remove course id: ${id}`)) {
        spinner.start();
        await dataProcessor.removeCourse(+id);
        tableHandler.showTable(await dataProcessor.getAllCourses());
        spinner.stop();
    }
}
window.showGeneration = () => {
    hideAll();
    formHandlerGenerate.show();
    activeButton.setActive(4);
}
