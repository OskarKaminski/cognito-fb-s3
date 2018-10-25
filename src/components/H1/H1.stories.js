import React from 'react'
import {storiesOf} from '@storybook/react'
import H1 from "./H1"

storiesOf('H1', module)
    .add('default', () => (
        <H1 title={'Ace Team'}/>
    ))
    .add('with different color', () => (
        <H1 title={'Ace Team'} color={'red'}/>
    ))