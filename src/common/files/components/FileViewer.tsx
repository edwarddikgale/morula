import React from 'react';
import DocViewer from "react-doc-viewer";

export interface FileUri{
    uri: string;
}

interface IProps{
    docs: FileUri[]
}

const FileViewer: React.FC<IProps> = ({docs}: IProps) => {
    return (
        <div>
            <div>images...</div>
            <DocViewer documents={docs} />
        </div>
    );
}

export default FileViewer;