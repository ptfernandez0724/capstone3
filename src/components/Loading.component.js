import React from 'react';
import * as Icon from 'react-icons/ri';

export default function Loading() {
    return (
        <section className="loading-container">
            <Icon.RiLoader3Fill className="loading-icon" />
        </section>
    );
}
