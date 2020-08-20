define([

], function (

) {
    'use strict';

    function iso8601ToDate(dateString) {
        if (!dateString) {
            return null;
        }
        var isoRE = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)([\+\-])(\d\d)(:?[\:]*)(\d\d)/;
        var dateParts = isoRE.exec(dateString);
        if (!dateParts) {
            throw new TypeError('Invalid Date Format for ' + dateString);
        }
        // This is why we do this -- JS insists on the colon in the tz offset.
        var offset = dateParts[7] + dateParts[8] + ':' + dateParts[10];
        var newDateString = dateParts[1] + '-' + dateParts[2] + '-' + dateParts[3] + 'T' + dateParts[4] + ':' + dateParts[5] + ':' + dateParts[6] + offset;
        return new Date(newDateString);
    }


    function workspaceInfoToObject(wsInfo) {
        return {
            id: wsInfo[0],
            name: wsInfo[1],
            owner: wsInfo[2],
            moddate: wsInfo[3],
            object_count: wsInfo[4],
            user_permission: wsInfo[5],
            globalread: wsInfo[6],
            lockstat: wsInfo[7],
            metadata: wsInfo[8],
            modDate: iso8601ToDate(wsInfo[3])
        };
    }

    function objectInfoToObject(data) {
        const type = data[2].split(/[-.]/);
        return {
            id: data[0],
            name: data[1],
            type: data[2],
            save_date: data[3],
            version: data[4],
            saved_by: data[5],
            wsid: data[6],
            ws: data[7],
            checksum: data[8],
            size: data[9],
            metadata: data[10],
            ref: data[6] + '/' + data[0] + '/' + data[4],
            obj_id: 'ws.' + data[6] + '.obj.' + data[0],
            typeModule: type[0],
            typeName: type[1],
            typeMajorVersion: type[2],
            typeMinorVersion: type[3],
            saveDate: iso8601ToDate(data[3])
        };
    }

    return {workspaceInfoToObject, objectInfoToObject};
});