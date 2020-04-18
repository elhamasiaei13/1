import Auth from 'routes/Auth/Module';
import Dashboard from 'routes/Home/Dashboard/Module';
import Basic from 'routes/Home/Basic/reducers';
import Evaluation360 from 'routes/Home/Evaluation360/reducers';
import Attendance from 'routes/Home/Attendance/reducers';
import Bulletin from 'routes/Home/Bulletin/reducers';
import Requests from 'routes/Home/Requests/reducers';
import ActivityLog from 'routes/Home/Test/ActivityLog/Module';
import Laboratory from 'routes/Home/Test/Laboratory/Module';
import GanttTestOrg from 'routes/Home/GanttTestOrg/Moudule';

export default {
    reducers: {
        Auth,
        Dashboard,
        Basic,
        Requests,
        ActivityLog,
        Evaluation360,
        Attendance,
        Laboratory,
        Bulletin,
        GanttTestOrg,
    },
};
