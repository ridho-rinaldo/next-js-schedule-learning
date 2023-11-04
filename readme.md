
# Class Management System

Class Management System is a software application or platform designed to efficiently manage and organize various aspects of educational institutions or classes, making it easier for administrators to manage.

First of all, to run the repository I use this configuration

node js: 14.17.3

npm : 6.14.13

browser: chrome

### 1. Dashboard
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/dashboard.png?raw=true)
Admin could use Dashboard to view Total Teacher, Subject, Class and Class Schedule (whether is active or not active)

### 2. Teacher
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/teacher.png?raw=true)
In this menu admin could manage (Add, Edit, and Delete) Teacher's Data and setting Teacher's statusses. Admin also could view and sort Teacher's Data based on filter that has been applied.

This View when Add Teacher
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/teacher-add.png?raw=true)
- Admin must input all fields and then click `Submit` Button to save data.
- All forms have their own validation

This View when Edit Teacher
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/teacher-edit.png?raw=true)
- Admin can edit all fields except field id and then click `Submit` Button to save data

### 3. Subject 
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/subject.png?raw=true)
In this menu admin could manage (Add, Edit, and Delete) Subject's Data and setting Subject's statusses. Admin also could view and sort Subject's Data based on filter that has been applied.

This View when Add Subject
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/subject-add.png?raw=true)
- Admin must input all fields and then click `Submit` Button to save data.
- All forms have their own validation

This View when Edit Subject
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/subject-edit.png?raw=true)
- Admin can edit all fields except field id and then click `Submit` Button to save data

### 4. Class
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class.png?raw=true)

![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class.png?raw=true)
In this menu admin could manage (Add, Edit, and Delete) Class' Data, setting Class' statusses, and assigning the Teacher into the class. Admin could view and sort Class' Data which already have assigned teacher based on filter that has been applied. On the other hand admin also could view and sort Class' Data which doesn't have assigned teacher.

This View when Add Class
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-add.png?raw=true)
- Admin must input all fields and then click `Submit` Button to save data.
- All forms have their own validation

This View when Edit Class
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-edit.png?raw=true)
- Admin can edit all fields except field id and then click `Submit` Button to save data

### 5. Class Schedule
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-schedule.png?raw=true)
- Admin could manage (Add, Edit, and Delete) Class Schedule's Data.
- Admin could view and sort Class Schedule's Data based on filter that has been applied.
- Set Class Schedule based on the Class that has been created on Class Menu.
- The schedule of the class could be set per meeting or set by first week
- Duration and Total Meeting could be set on Subject's Menu

![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-schedule-example-add-1.png?raw=true)
This picture is example when add new Class Schedule.

When add new Class Schedule there's two option for set the schedule `Set per meeting`, and `Set by First week`
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-schedule-input-per-meeting.png?raw=true)

Set per meeting, Admin can set the date and time of all meeting lists

![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-schedule-input-by-first-week.png?raw=true)

Set by First week, Admin set meeting by set the start date first, and then list days of first week will show and then choose a day that will be used as a regular schedule until the total number of meetings is finished.

This View when Edit Class Schedule
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/class-schedule-edit.png?raw=true)
- Admin can edit all fields except field id and then click `Submit` Button to save data

### 6. Example Delete Data
All menu can delete their data by click `Trash Button` from Table List and then will show `Pop up Confirmation` to execute delete or not
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/example-delete.png?raw=true)

### 7. Example Notification
There is 2 (two) type of notification, `Success Notification` and `Failed Notification`

- Success Notification
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/example-success-notification.png?raw=true)

- Failed Notification
![alt text](https://github.com/ridho-rinaldo/next-js-schedule-learning/blob/create_comment/screenshot/example-failed-notification.png?raw=true)