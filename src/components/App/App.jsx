import React, { Component } from 'react';

import { Statistics } from '../Statistics/Statistics';
import { Section } from '../Section/Section';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';

import { Container } from './App.styled.js';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = event => {
    const label = event.target.textContent;

    this.setState(prevState => ({ [label]: (prevState[label] += 1) }));
  };

  countTotalFeedback = () => {
    const total = Object.keys(this.state).reduce(
      (acc, value) => acc + this.state[value],
      0
    );

    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const percent = Math.round(
      (this.state.good * 100) / this.countTotalFeedback()
    );

    return percent;
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={this.countTotalFeedback}
            positivePercentage={this.countPositiveFeedbackPercentage}
          />
        </Section>
      </Container>
    );
  }
}
