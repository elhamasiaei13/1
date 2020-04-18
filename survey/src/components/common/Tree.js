import React from 'react';
import PropTypes from 'prop-types';
import Branch from './Branch';
import { Panel, Media, Button } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';


const Tree = ({ branches, selectedId, selectLeafHandler }) => {
    
    bootstrapUtils.addStyle(Button, 'tag') 
    
    return (
        <Panel >
            <h4>
                گروه ها
            </h4>
            <Media>
                <Media.Left>
                    &nbsp;&nbsp;
                </Media.Left>
                <Media.Body>
                    <Media.Heading componentClass="p">
                        <Button
                            bsSize="sm"                           
                            bsStyle="tag" 
                            onClick={() => selectLeafHandler(null)}
                            active={selectedId == null ? true : false}>
                            همه
                        </Button>
                    </Media.Heading>
                </Media.Body>
            </Media >
            {branches.map(branch =>
                <Branch
                    key={branch["id"]}
                    id={branch["id"]}
                    name={branch["name"]}
                    selectedId={selectedId}
                    children={branch["children"]}
                    selectLeafHandler={selectLeafHandler} />
            )}
        </Panel>
    );
};

Tree.propTypes = {
    branches: PropTypes.array.isRequired,
    selectLeafHandler: PropTypes.func.isRequired,
    selectedId: PropTypes.number,
};

export default Tree;