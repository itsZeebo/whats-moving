import "./UploadComponent.scss";
import "react-dropzone-uploader/dist/styles.css";

import React from "react";

import Dropzone, { IFileWithMeta, IUploadParams, StatusValue } from "react-dropzone-uploader";
import uuidv4 from "uuid/v4";

const UPLOAD_URL = "http://localhost:6666";

export default function UploadComponent() {
    return <div className="upload-component">
        <Dropzone autoUpload={false}
            getUploadParams={_getUploadParams}
            onChangeStatus={_handleChangeStatus}
            onSubmit={_handleSubmit}
            accept="video/*" />
    </div>;
}

const _getUploadParams = (metadata: IFileWithMeta): IUploadParams => {
    const body = new FormData();

    body.append("file", metadata.file);
    body.append("videoId", uuidv4());

    return {
        url: UPLOAD_URL,
        body
    }
}

const _handleChangeStatus = (file: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[]) =>
    console.log(`File status changed for file: ${file.meta.name}, Status: ${status}`);

const _handleSubmit = (passedFiles: IFileWithMeta[], allFiles: IFileWithMeta[]) =>
    console.log(`Files uploaded: ${passedFiles.map(file => file.meta.name)}`);
