import React from 'react';
import TextProcessor from '../../components/TextProcessor/TextProcessor';

export default function CreateTemplate(props) {
    return (
        <div>
            <TextProcessor {...props} />
        </div>
    );
}
