import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Dashboard.scss';
import { MANUFACTURER } from '../../routers';
import Tooltip from '../tooltip';
import { connect } from 'react-redux';

const Header = React.lazy(() => import('../header'));
const Footer = React.lazy(() => import('../footer'));
const ListPage = React.lazy(() => import('../../templates/manufacturer/index'));

const Dashboard = ({tooltip={}}:any): JSX.Element => {

	return (
		<React.Suspense fallback={<CircularProgress />}>
			<Header />
			{!!tooltip && tooltip.message !== "" && <Tooltip/>}
			<div className={'container'}>
				<Switch>
					<Route path={`${MANUFACTURER}`} component={ListPage}></Route>
					<Route exact path={'/'}>
						<Redirect to={`${MANUFACTURER}`} />
					</Route>
					<Redirect from="*" to={`${MANUFACTURER}`} />
				</Switch>
			</div>
			
			<Footer />
		</React.Suspense>
	);
};

const mapStateToProps = (state: any) => {

	return {
		tooltip: state.global.tooltip,
	};
};

export default connect(mapStateToProps, null)(Dashboard);