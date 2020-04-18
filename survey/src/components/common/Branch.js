import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button, } from 'react-bootstrap';

const Branch = ({ id, name, selectedId, children, selectLeafHandler }) => {

    const isSelected = id === selectedId;
    return (
        <Media>
            <Media.Left>
                &nbsp;&nbsp;
                {/* <Button bsSize="xsmall">-</Button> */}
            </Media.Left>
            <Media.Body>
                <Media.Heading componentClass="p">
                    
                    <Button
                        bsSize="sm"
                        bsStyle="tag"
                        onClick={() => selectLeafHandler(id)}
                        active={isSelected ? true : false}>
                        {name}
                    </Button>
                </Media.Heading>

                {children && children.map(child =>
                    <Branch
                        key={child.id}
                        id={child.id}
                        name={child.name}
                        selectedId={selectedId}
                        children={child.children}
                        selectLeafHandler={selectLeafHandler} />
                )}
            </Media.Body>
        </Media >

    );
};

Branch.propTypes = {
    id: PropTypes.number.isRequired,
    selectedId: PropTypes.number,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,
    selectLeafHandler: PropTypes.func.isRequired,
};

export default Branch;