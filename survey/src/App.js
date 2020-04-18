import Main from './components/common/Main';
import Header from './components/common/Header';
import {
	Row,
	Grid,
} from 'react-bootstrap';
import connect from 'react-redux/lib/connect/connect';
import withRouter from 'react-router-dom/withRouter';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { logout } from './actions/userActions';
import Footer from './components/common/Footer';


class App extends Component {

	render() {
		const {
			authenticated,
			actions,
			user
		} = this.props;
		const { logout } = actions;

		return (
			<div>
				<Header isLogged={authenticated} logoutHandler={logout} userName={user? user.name:null} />
				<Grid>
					{/* <Row>
						<Col xs={12} md={12} lg={12} sm={12}>
							<Breadcrumb>
								<Breadcrumb.Item href="#">صفحه اصلی</Breadcrumb.Item>
								<Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
									آزمون
  								</Breadcrumb.Item>
								<Breadcrumb.Item active>Data</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
					</Row> */}

					<Row>
						<Main authenticated={authenticated} />
					</Row>
				</Grid>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	const { genericError, auth } = state.app;
	const { authenticated, user } = auth;

	return {
		authenticated,
		genericError,
		user
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			logout
		}, dispatch)
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App));