import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { MANUFACTURER } from '../../routers';

const Home = React.lazy(() => import('./home'));
 
interface Props { }

interface State { }

class IndexManufacturer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {};

	}

	render() {
		return (
			<React.Suspense fallback={<CircularProgress />}>
				<div>
					<Switch>
						<Route exact path={`${MANUFACTURER}`} component={Home}></Route>
					</Switch>
				</div>
			</React.Suspense>
		);
	}
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(IndexManufacturer);
