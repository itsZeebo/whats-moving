import "./UploadComponent.scss";
import "react-dropzone-uploader/dist/styles.css";

import React from "react";

import Dropzone, { IFileWithMeta, IUploadParams, StatusValue } from "react-dropzone-uploader";

const UPLOAD_URL = "http://localhost:3005/uploadFile";

export default function UploadComponent() {
    return <div className="upload-component">
        <Dropzone autoUpload={false}
            getUploadParams={_getUploadParams}
            onChangeStatus={_handleChangeStatus}
            onSubmit={_handleSubmit}
            accept="video/*" />
    </div>;
}

const _getUploadParams = (metadata: IFileWithMeta): IUploadParams => { return { url: UPLOAD_URL } }

const _handleChangeStatus = (file: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[]) =>
    console.log(`File status changed for file: ${file.meta.name}, Status: ${status}`);

const _handleSubmit = (passedFiles: IFileWithMeta[], allFiles: IFileWithMeta[]) =>
    console.log(`Files uploaded: ${passedFiles.map(file => file.meta.name)}`);
