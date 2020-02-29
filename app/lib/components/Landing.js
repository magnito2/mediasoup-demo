import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Jumbotron, Row, Col, Card, ButtonToolbar, Button } from 'react-bootstrap';

class Landing extends Component
{
	constructor()
	{
		super();
		this.state = {};
	}

	render()
	{
		return (
			<div data-component='Landing'>
				<Container>
					<Jumbotron>
						<h1>Be Awesome, create something nice </h1>
					</Jumbotron>

					<Row className='justify-content-md-center'>
						<Col xs={6}>
							<Card>
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
									<p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
									{
										this.props.auth.isAuthenticated ?
											<Button variant='success'>Join Room</Button> :
											<ButtonToolbar>
												<Button variant='primary'>Login</Button>
												<Button variant='secondary'>Sign Up</Button>
											</ButtonToolbar>
									}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth : state.auth
});

export default connect(
	mapStateToProps,
	{}
)(Landing);
