import courseData from './config/courseData.json'
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 100;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
function render(){
    document.getElementById(`courses`).innerHTML = createCourses().map(el => `<li>${JSON.stringify(el)}</li>`);
}
//TODO rendering inside <ul>
render();