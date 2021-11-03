import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import favicon from '../assets/img/favicon.ico';

export default function ReactHelmet({
    title, desc, keyword, url,
}) {
    return (
        <Helmet>
            <title>{(title) || 'Silicon Mafia'}</title>
            <meta name="keyword" content={(keyword) || 'blank, blank'} />
            <meta name="description" content={(desc) || 'Description here'} />
            <link rel="canonical" href={(url) || ' '} />
            <link rel="icon" type="image/ico" href={favicon} />
        </Helmet>
    );
}

ReactHelmet.PropType = {
    title: PropTypes.string,
    desc: PropTypes.string,
    keyword: PropTypes.string,
    url: PropTypes.string,
};
