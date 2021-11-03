import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageStepper, RoomCard } from '../../components/components.component';
import { AiOutlineCalendar, AiOutlineInfoCircle, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

class RoomSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: this.props.location.query ? this.props.location.query : [],
            superiorSeaView: [
            ],
            standardRoom: [
            ],
            roomDefault: {
                adults: this.props.location.query ? this.props.location.query.adults.default : 1,
                children: this.props.location.query ? this.props.location.query.children.default : 0,
                addOns: {
                    adults: 0,
                    children: 0,
                },
                rates: 0
            },
        };
    }

    addSSVRoom = () => {
        this.setState(prevState => ({
            superiorSeaView: [
                ...prevState.superiorSeaView,
                this.state.roomDefault
            ]
        }))
    }

    removeSSVRoom = () => {
        this.setState(prevState => ({
            superiorSeaView: [
                ...prevState.superiorSeaView.slice(0, -1)
            ]
        }))
    }

    render() {
        return (
            <>
                <div className="container-fluid p-3">
                    <div className="py-4">
                        <PageStepper activeStep={0} />
                    </div>
                    <div className="navbar navbar-expand-lg p-2">
                        <div className="w-75 p-0 mx-0">
                            <h3 className="h3 fw-bolder">
                                Select Rooms
                            </h3>
                            <h6 className="text-muted fw-light">
                                Select how many rooms you will use while staying.
                            </h6>
                        </div>
                        <button className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#filterContent"
                            aria-controls="filterContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <AiOutlineCalendar size={30} />
                        </button>
                        <div className="collapse navbar-collapse py-2" id="filterContent">
                            <div className="me-auto">
                            </div>
                            <ul className="navbar-nav grid d-flex mb-2 mb-lg-0">
                                <li className="nav-item p-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <input className="form-control border-0" />
                                        </div>
                                        <div className="col-6">
                                            <input className="form-control border-0" />
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item p-2">
                                    <div className="col-12">
                                        <input className="form-control border-0" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div >

                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex">
                                <h5 className="h5 text-primary fw-bold pe-2">
                                    Superior Sea View
                                </h5>
                                <Link className="text-muted" to="/superior-sea-view">
                                    <AiOutlineInfoCircle />
                                </Link>
                            </div>
                            <div className="d-flex align-items-center justify-content-end">
                                <button className="btn bg-white" onClick={this.removeSSVRoom}>
                                    <AiOutlineMinus />
                                </button>
                                <span className="px-3">
                                    {this.state.superiorSeaView.length}
                                </span>
                                <button className="btn bg-white" onClick={this.addSSVRoom}>
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>
                        <div className="row flex-row flex-nowrap flex-sm-wrap"
                            style={{
                                overflowX: 'auto',
                                overflowY: 'hidden'
                            }}>
                            {
                                this.state.superiorSeaView.length === 0 ?
                                    <RoomCard disabled={true} /> :
                                    this.state.superiorSeaView.map((card, i) =>
                                        <RoomCard key={i} disabled={false} data={this.state.superiorSeaView[i]} />
                                    )
                            }
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default RoomSelection;