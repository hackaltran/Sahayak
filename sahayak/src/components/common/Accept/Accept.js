import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  function Accept(props) {
  
    function onDrop(acceptedFiles) {
      console.log(acceptedFiles, 'accepted files');
    //   const url='http://127.0.0.1:8000/api/serice';
    //   const formData={file:acceptedFiles};
    //   return axios.post(url, formData)
    //   .then(response => console.log(response));
    }
  
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptedFiles, 
      rejectedFiles
    } = useDropzone({
      accept: 'application/pdf',
      multiple: false,
      onDrop
      });
  
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject
    ]);
    
    const acceptedFilesItems = acceptedFiles.map(file => (  
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    const rejectedFilesItems = rejectedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <section className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.pdf)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>
            {acceptedFilesItems}
          </ul>
          <h4>Rejected files</h4>
          <ul>
            {rejectedFilesItems}
          </ul>
        </aside>
      </section>
    );
  }

  export default Accept;