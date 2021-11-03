import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCalendar4Event, BsCalendar4Range } from 'react-icons/bs';
import { MdOutlineChildCare } from "react-icons/md";
import { RiUserSmileLine } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FiChevronsRight } from 'react-icons/fi';

const iconSize = 20;

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adults: {
                default: 1,
                max: 2,
                min: 1,
            },
            children: {
                default: 0,
                max: 2,
                min: 0,
            }
        };
    }

    addChildren = () => {
        this.setState(prevState => ({
            children: {
                ...prevState.children,
                default: this.state.children.default + 1,
            }
        }));
        console.log(this.state)
    };

    addAdults = () => {
        this.setState(prevState => ({
            adults: {
                ...prevState.adult,
                default: this.state.adults.default + 1,
            }
        }));
    };

    removeChildren = () => {
        this.setState(prevState => ({
            children: {
                ...prevState.children,
                default: this.state.children.default - 1,
            }
        }));
    };

    removeAdults = () => {
        this.setState(prevState => ({
            adults: {
                ...prevState.adults,
                default: this.state.adults.default - 1,
            }
        }));
    };


    render() {
        return (<>
            <div className="container p-3">
                <div className="position-absolute top-50 start-0 translate-middle-y text-center">
                    <span className="h1 fw-bolder">
                        Welcome to Acea Resorts
                    </span>
                    <div className="card grid p-3 mx-4 border-0 border-radius my-4">
                        <div className="row p-2">
                            <div className="col-12 d-flex align-items-center">
                                <BsCalendar4Event size={iconSize} />
                                <input className="form-control border-0 ms-3" placeholder="Start Date"></input>
                            </div>
                            <div className="dropdown-divider my-3"></div>
                            <div className="col-12 d-flex align-items-center">
                                <BsCalendar4Range size={iconSize} />
                                <input className="form-control border-0 ms-3" placeholder="End Date"></input>
                            </div>
                        </div>
                    </div>
                    <div className="card grid p-3 mx-4 border-0 border-radius">
                        <div className="row p-2">
                            <div className="col-12 d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <RiUserSmileLine size={iconSize} />
                                    <span className="fw-bolder ms-4">
                                        {this.state.adults.default} Adult
                                        {this.state.adults.default === 1 ?
                                            '' :
                                            's'}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center border-radius-sm overflow-hidden">
                                    <button className={"btn btn-light" +
                                        (this.state.adults.default === this.state.adults.min ?
                                            ' opacity-25' :
                                            '')}
                                        onClick={() =>
                                            this.state.adults.default === this.state.adults.min ?
                                                '' :
                                                this.removeAdults()}>
                                        <AiOutlineMinus size={iconSize} />
                                    </button>
                                    <button className={"btn btn-light ms-1" +
                                        (this.state.adults.default === this.state.adults.max ?
                                            ' opacity-25' :
                                            '')}
                                        onClick={() =>
                                            this.state.adults.default === this.state.adults.max ?
                                                '' :
                                                this.addAdults()}>
                                        <AiOutlinePlus size={iconSize} />
                                    </button>
                                </div>
                            </div>
                            <div className="dropdown-divider my-3"></div>
                            <div className="col-12 d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <MdOutlineChildCare size={iconSize} />
                                    <span className="fw-bolder ms-4">
                                        {this.state.children.default} Child
                                        {this.state.children.default === 1 ?
                                            '' :
                                            'ren'}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center border-radius-sm overflow-hidden">
                                    <button
                                        className={"btn btn-light" +
                                            (this.state.children.default === this.state.children.min ?
                                                ' opacity-25' :
                                                '')}
                                        onClick={() =>
                                            this.state.children.default === this.state.children.min ?
                                                '' :
                                                this.removeChildren()}>
                                        <AiOutlineMinus size={iconSize} />
                                    </button>
                                    <button className={"btn btn-light ms-1" +
                                        (this.state.children.default === this.state.children.max ?
                                            ' opacity-25' :
                                            '')}
                                        onClick={() =>
                                            this.state.children.default === this.state.children.max ?
                                                '' :
                                                this.addChildren()}>
                                        <AiOutlinePlus size={iconSize} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="fixed-bottom p-3">
                <Link to={{pathname: '/room-selection', query: this.state}}>
                    <button className="btn btn-primary w-100 py-3 px-4 border-radius d-flex justify-content-between align-items-center">
                        <span className="fw-bolder">
                            Check Booking
                        </span>
                        <FiChevronsRight size={iconSize} opacity={.25} />
                    </button>
                </Link>
            </footer>
        </>);
    }
}

export default Intro;