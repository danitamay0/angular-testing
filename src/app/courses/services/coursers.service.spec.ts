import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";



describe("CoursesService", () => {
    let coursesService: CoursesService,
        httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService,

            ]
        })

        coursesService = TestBed.inject(CoursesService)
        httpTestingController = TestBed.inject(HttpTestingController)

    })

    it('Should retrieve all courses', () => {

        coursesService.findAllCourses().subscribe(courses => {
            console.log(courses);

            expect(courses).toBeTruthy("No courses")

            expect(courses.length).toBe(12, "incorrect number of courses")

            const course = courses.find(c => c.id == 12)
            expect(course.titles.description).toBe("Angular Testing Course")
        })

        const req = httpTestingController.expectOne('/api/courses')
        expect(req.request.method).toEqual("GET")

        req.flush({ payload: Object.values(COURSES) })

    });


    it('Should retrieve one course', () => {

        const courseId = 12

        coursesService.findCourseById(courseId).subscribe(course => {

            expect(course).toBeTruthy()

            expect(course.id).toBe(12)
        })

        const req = httpTestingController.expectOne(`/api/courses/${courseId}`)
        expect(req.request.method).toEqual("GET")

        req.flush(COURSES[courseId])

    });

    afterEach(() => {
        httpTestingController.verify() // ?

    })
})