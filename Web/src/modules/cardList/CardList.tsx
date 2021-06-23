/* eslint-disable react/jsx-no-target-blank */
import './CardList.scss';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { FormattedMessage } from 'react-intl';

interface Props {
    dataArray:Array<any>;
    actionComponent?: Function;
    checkArray?: any;
	checkOnClickAction?: Function;
}

const CardList = ({ 
    dataArray = [], 
    actionComponent = () => {},
    checkArray,
	checkOnClickAction = () => {},
}:Props) => (

    <div data-testid="card-list-render" className={"card-manufacturer"}>
        {
            !!dataArray && dataArray.length > 0 && dataArray.map((dataObj:any, index:any) =>

                <div key={dataObj._id} className={"row-manufacturer"}>

                    {
                    checkArray && Array.isArray(checkArray) && checkArray
                    .map((itemCheck: any, indexCheck: any) => (
                            <Checkbox
                                checked={dataObj.isChecked ? dataObj.isChecked : false}
                                onChange={() =>
                                    checkOnClickAction({
                                        name: itemCheck,
                                        "item":dataObj,
                                        index,
                                    })
                                }
                                key={`CheckBox-${index}-${indexCheck}`}
                                value="rescheduleTask"
                                style={{ color: 'rgb(46, 45, 45)' }}
                            />
                        ))
                    }

                    <div className="display-title">

                        <div className="display-title-block">
                            <div className="title-card">
                               <b><FormattedMessage id="name" /></b>
                            </div>
                            <div>
                               {dataObj.name || ""}
                            </div>

                        </div>

                        <div className="display-title-block">
                            <div className="title-card">
                                <b><FormattedMessage id="phone" /> </b>
                            </div>
                            <div>
                              {dataObj.phone || ""}
                            </div>
                        </div>

                        <div className="display-title-block">
                            <div className="title-card">
                                <b>E-mail </b>
                            </div>
                            <div>
                                {dataObj.email || ""}
                            </div>
                        </div>

                    </div> 

                    {actionComponent({"item":dataObj})}

                </div>

        )}
        {
            !!!dataArray && <div>No aguardo de dados</div>
        }
    </div>
    
);

export {CardList};