/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import '../sass/Manufacturer.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CardList  from "../../../modules/cardList";
import { 
	getManufacturer, 
	deleteManufacturer, 
	createManufacturer, 
	editManufacturer } from '../actions';
import Button from '../../../modules/button';
import SearchInput from '../../../modules/searchInput';
import { MANUFACTURER_DETAILS } from '../../../routers';
import Modal from '@material-ui/core/Modal';
import {setTooltip} from '../../../actions/tooltip';
import { setLocale } from '../../../actions/locale';
import { axiosLocalhost } from '../../../connections/localhost';
import Delete from '../../../assets/image/delete.jpg';
import Edit from '../../../assets/image/edit.png';
import Create from '../../../assets/image/create.png';

interface Props {
	history: any;
	manufacturer: any;
	manufacturerById: any;
	loadingManufacturer:any;
	loadingEmail:any;
	getManufacturer: Function;
	deleteManufacturer: Function;
	createManufacturer: Function;
	editManufacturer: Function;
	setTooltip: Function;
	setLocale: Function;
}

interface State {}

class HomePage extends React.Component<Props, State> {

	public state: any;
	constructor(props: Props) {

		super(props);
		this.state = {
			arraySelectedManufacturer:[],
			isCheckAllPage:false,
			search:"",
			openModal:false,
			emailProfile:"",
			emailTitle:"",
			disabledButton:"",
			body:{
				name: "",
				corporateName: "",
				cnpj: "",
				segment: "",
				address: "",
				phone: "",
				email: ""
			},
			_id:null
		};

		this.setArraySelectedManufacturer = this.setArraySelectedManufacturer.bind(this);
		this.removeArraySelectedManufacturer = this.removeArraySelectedManufacturer.bind(this);
		this.renderModal = this.renderModal.bind(this);
		this.controlModal = this.controlModal.bind(this);
		this.onChange = this.onChange.bind(this);
		this.createOrEditManufacturer = this.createOrEditManufacturer.bind(this);
		this.getByIdManufacturer = this.getByIdManufacturer.bind(this);

	}

	componentWillMount() {

		this.props.getManufacturer();
		console.log({"manufacturer":this.props.manufacturer})

	}

	createOrEditManufacturer () {

		const {body, _id} = this.state;

		if (!_id) return this.props.createManufacturer(body)
		return this.props.editManufacturer(_id, body)

	}

	onChange (event:any) {

		const {body} = this.state;
		body[event.target.name] = event.target.value
		this.setState({body});

	}

	setArraySelectedManufacturer ({ item }: any) {

		const {arraySelectedManufacturer} = this.state;

		if (arraySelectedManufacturer.includes(item.id)) {

			const index = arraySelectedManufacturer.indexOf(item.id);
			arraySelectedManufacturer.splice(index, 1);

		} else {

			arraySelectedManufacturer.push(item.id);

		}

		this.setState({arraySelectedManufacturer});

	}
	
	removeArraySelectedManufacturer ({ item }: any) {

		const {arraySelectedManufacturer} = this.state;

		if (arraySelectedManufacturer.includes(item.id)) {

			const index = arraySelectedManufacturer.indexOf(item.id);
			arraySelectedManufacturer.splice(index, 1);
			
			this.setState({arraySelectedManufacturer});

		}


	}

	handleSelectAllPage ({ item }:any) {

		const {isCheckAllPage} = this.state;

		if (isCheckAllPage) {

			this.setState({arraySelectedManufacturer:[]});
			item.map((item: any) => this.removeArraySelectedManufacturer({ item }));


		} else {

			item.map((item: any) => this.removeArraySelectedManufacturer({ item }));

			item.map((item: any) => this.setArraySelectedManufacturer({ item }));


		}

		this.setState({isCheckAllPage:!isCheckAllPage});
	}

	handleChangeSearch (search: string) {
		this.setState({search});
	}

	controlModal () {

		const {openModal} = this.state;
		this.setState({openModal:!openModal, _id:null})

	}

	getByIdManufacturer (id:any) {

		axiosLocalhost().get(`/api/list/${id}`)
            .then((res:any) => {

                const {data} = res.data;

                this.setState({body:data[0], _id:id, openModal:true});
            })
            .catch(() => {

            });

	}

	renderModal () {

		const {
			openModal, 
			body, 
			_id} = this.state;

		return (
			<Modal
				open={openModal}
				onClose={() => this.controlModal()}
			>
				<div className={"modal-shared"}>

					<div className={"modal-container"}>

						<div className={"modal-title"}>
							{!_id && <FormattedMessage id={"manufacturer_register"}/>}
							{_id && <FormattedMessage id={"manufacturer_edit"}/>}
						</div>

						<div className={"modal-input"}>
							<input
								name={"name"}
								value={body.name || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"Nome"}
							/>
						</div>

						<div className={"modal-input"}>
							<input
								name={"corporateName"}
								value={body.corporateName || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"Razão Social"}
							/>
						</div>

						<div className={"modal-input"}>
							<input
								name={"cnpj"}
								value={body.cnpj || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"CNPJ"}
							/>
						</div>

						<div className={"modal-input"}>
							<input
								name={"segment"}
								value={body.segment || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"Segmento"}
							/>
						</div>

						<div className={"modal-input"}>
							<input
								name={"address"}
								value={body.address || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"Endereço"}
							/>
						</div>

						<div className={"modal-input"}>
							<input
								name={"phone"}
								value={body.phone || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"Telefone"}
							/>
						</div>

						<div className={"modal-input"}>
							<input
								name={"email"}
								value={body.email || ""}
								onChange={this.onChange}
								type="text"
								placeholder={"E-mail"}
							/>
						</div>

						<div className={"modal-button"}>
						<Button 
							obj={{text:"save"}} 
							onClick={() => 
								this.setState({openModal:false}, () => this.createOrEditManufacturer())
							}/>
						<Button 
							obj={{text:"cancel", type:"secundary"}} 
							onClick={() => 
								this.setState({openModal:false})
							}/>
						</div>
						
					</div>

				</div>
			</Modal>
		);
	}

	render() {

		const {manufacturer, loadingManufacturer, loadingEmail} = this.props;
		const {search} = this.state;

		const filterCountries = (values: Array<any>, value?: string) => {
		
			if (!values) {
				return [];
			}
	
			if (!value) {
				return values;
			}
	
			const valueSearch = value;
	
			// eslint-disable-next-line max-len
			return values.filter((item: any) => item.name.toUpperCase().includes(valueSearch.toUpperCase()));
		}

		return (
			<React.Suspense fallback={<CircularProgress />}>
				<div 
					data-testid="manufacturer-render" 
					className={`content ${(loadingManufacturer || loadingEmail.status) && 'loading'}`}>

					{this.renderModal()}

					<div className="header-home">

						<div className={"create-home"}>
							<img className={"create-img"} src={Create} onClick={() => this.setState({
								openModal:true,
								body:{
									name: "",
									corporateName: "",
									cnpj: "",
									segment: "",
									address: "",
									phone: "",
									email: ""
								}
							})}/>
						</div>

						<div className="search-home">
							<SearchInput 
								onChange={(event:string) => this.handleChangeSearch(event)}
								search={search}
							/>
						</div>
				
					</div>	

					<div className="body-home">
						{manufacturer && 
							<CardList
								dataArray={filterCountries(!!manufacturer ? manufacturer : [], search)}
								actionComponent={
									({item}:any) =>

									<div>
										<img className={"body-img"} src={Edit} onClick={() => 
											this.getByIdManufacturer(item._id)}/>
											
										<img className={"body-img"} src={Delete} onClick={() => 
											this.props.deleteManufacturer(item._id)}/>
									</div>

								}
							/>
						}

					</div>		
					
				</div>

			</React.Suspense>
		);
	}
}

const mapStateToProps = (state: any) => {

	return {
		language: state.global.language,
		manufacturer: state.manufacturer.manufacturer,
		manufacturerById: state.manufacturer.manufacturerById,
		loadingManufacturer: state.manufacturer.loadingManufacturer,
		loadingEmail: state.manufacturer.loadingEmail,
	};
};

const mapDispatchToProps = (dispatch:any) => ({ 
	"getManufacturer": () => dispatch(getManufacturer()),
	"editManufacturer": (id:any, body:any) => dispatch(editManufacturer(id, body)),
	"createManufacturer": (body:any) => dispatch(createManufacturer(body)),
	"deleteManufacturer": (id:any) => dispatch(deleteManufacturer(id)),
	"setTooltip": (params:any) => dispatch(setTooltip(params)),
	"setLocale": (params:any) => dispatch(setLocale(params)),
 });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);