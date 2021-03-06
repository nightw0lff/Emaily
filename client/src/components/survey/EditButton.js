import React from 'react';

const EditButton = ({ previewHandler }) => (
    <div className="row">
        <div className="col offset-m11 offset-s9 right-align">
            <a style={{
                position: 'absolute', 
                top: 110,
                cursor: 'pointer'}}
                onClick={previewHandler}
                className="btn-floating btn-medium waves-effect waves-light pulse grey">
                <i className="material-icons">edit</i>
            </a>
        </div>
    </div>
);

export default EditButton;
