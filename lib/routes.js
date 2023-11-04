import { ProfileTwoTone, AccountBookTwoTone, CalendarTwoTone, HomeTwoTone } from '@ant-design/icons';

export default [
  {
    path: "/",
    name: "Home",
    icon: <HomeTwoTone style={{ fontSize: '16px' }} />
  },
  {
    path: "/teacher",
    name: "Teacher",
    icon: <ProfileTwoTone style={{ fontSize: '16px' }} />,
    insideMenu: [
      {
        path: "/teacher/add",
        name: "Add Teacher",
      },
      {
        path: "/teacher/edit",
        name: "Edit Teacher",
      }
    ]
  },
  {
    path: "/subject",
    name: "Subject",
    icon: <AccountBookTwoTone style={{ fontSize: '16px' }} />,
    insideMenu: [
      {
        path: "/subject/add",
        name: "Add Subject",
      },
      {
        path: "/subject/edit",
        name: "Edit Subject",
      }
    ]
  },
  {
    path: "/class",
    name: "Class",
    icon: <CalendarTwoTone style={{ fontSize: '16px' }} />,
    insideMenu: [
      {
        path: "/class/add",
        name: "Add Class",
      },
      {
        path: "/class/edit",
        name: "Edit Class",
      }
    ]
  },
  {
    path: "/class-schedule",
    name: "Class Schedule",
    icon: <CalendarTwoTone style={{ fontSize: '16px' }} />,
    insideMenu: [
      {
        path: "/class-schedule/add",
        name: "Add Class Schedule",
      },
      {
        path: "/class-schedule/edit",
        name: "Edit Class Schedule",
      }
    ]
  }
];
