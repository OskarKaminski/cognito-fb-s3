import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const MainStyle = styled.span`
    color: ${props => props.color || "#fff"};	
    font-size: 40px;	
    line-height: 52px;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
`

/**
 * Component showing a heading
 *
 * @version 1.0.0
 */

const H1 = ({title, color}) => (
    <MainStyle color={color}>{title}</MainStyle>
)


H1.propTypes = {
    /** Title of heading */
    title: PropTypes.string,
    /** Color of header heading */
    color: PropTypes.string
};
export default H1