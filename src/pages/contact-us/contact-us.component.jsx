import React from "react";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { BsPhone } from 'react-icons/bs';

const cards = [
    {
        icon: {
            big: <HiOutlineLocationMarker size='125px' color='#fff' />,
            small: <HiOutlineLocationMarker size='25px' color='#fff' />
        },
        title: 'San Bernardo Road, Subic Bay, Freeport Zone',
        subtitle: 'Address',
        link: 'https://www.google.com/maps?saddr=My+Location&daddr=ACEA+Subic+Beach+Resort+San+Bernardo=Rd+Subic+Bay+Freeport+Zone+2200+Zambales'
    },
    {
        icon: {
            big: <HiOutlineMail size='125px' color='#fff' />,
            small: <HiOutlineMail size='25px' color='#fff' />
        },
        title: 'reservations @acea.ph',
        subtitle: 'Email',
        link: 'mailto:reservations@acea.ph'
    },
    {
        icon: {
            big: <HiOutlinePhone size='125px' color='#fff' />,
            small: <HiOutlinePhone size='25px' color='#fff' />
        },
        title: '(047) 252-2232',
        subtitle: 'Landline',
        link: 'tel:(047) 252-2232'
    },
    {
        icon: {
            big: <BsPhone size='125px' color='#fff' />,
            small: <BsPhone size='25px' color='#fff' />
        },
        title: '0917-114-1111',
        subtitle: 'Mobile',
        link: 'tel:0917-114-1111'
    }
]

const ContactUs = () => {
    return (
        <div className="p-4">
            <div className="container-fluid">
                <div className="w-75 p-0 mx-0">
                    <h3 className="h3 fw-bolder">
                        Contact Us
                    </h3>
                    <h6 className="text-muted fw-light">
                        If you have any inquiries, feel free to contact us through the following:
                    </h6>
                </div>
            </div>

            <div className="grid px-2 py-4">
                <div className="row gx-4">
                    {cards.map((card, index) => (
                        <div className="col-6 mb-4">
                            <a href={card.link}>
                                <div className="card btn bg-primary p-3 border-0" style={{ height: '250px', borderRadius: '25px' }}>
                                    {card.icon.small}
                                    <div className="position-absolute top-50 start-50 translate-middle opacity-25">
                                        {card.icon.big}
                                    </div>
                                    <div className="card-body position-absolute bottom-0 end-0 p-4 text-white text-end">
                                        <div className="h5 fw-bolder">
                                            {card.title}
                                        </div>
                                        <div className="opacity-75">
                                            {card.subtitle}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactUs;