import React from "react";

import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineViews, Inject, ResourcesDirective, ResourceDirective, Resize, DragAndDrop, EventSettingsModel, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';

import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';

import * as dataSource from './datasource.json';

function TimelineResource() {
    const localData= {
        dataSource:[{
            "Subject": "Board Meeting",
            "Description": "Meeting to discuss business goal of 2021.",
            EndTime:new Date(2022,10,29,18,59),
            StartTime:new Date(2022,10,29,18,30),
        }

        ]
    }
    return (
        <ScheduleComponent currentView="WorkWeek" selectedDate={new Date(2022,10, 29)} eventSettings={localData}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}

export default TimelineResource;
