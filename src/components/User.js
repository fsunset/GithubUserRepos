import React, {Component} from 'react';
import {Cookies} from "react-cookie";
import MaterialTable from "material-table";

import {
	Search,
	SaveAlt,
	ChevronLeft,
	ChevronRight,
	FirstPage,
	LastPage,
	Check,
	FilterList,
	Remove,
} from "@material-ui/icons";


class User extends Component {
	state = {}

	handleInputChange = (e) => {
		const value =  e.target.value,
			name = e.target.name;

		this.setState({
			[name]: value
		});
	}

	processUserData = (e) => {
		e.preventDefault();

		// *** Create cookie with user info ***
		const cookies = new Cookies();
		cookies.set('UserFormInfo', this.state, { path: '/' });

		
		// *** In order to render user data ***
		let userGithubUser = this.state.githubUser;

		// *** Get user's repos data ***
		fetch('https://api.github.com/users/' + userGithubUser + '/repos',
		{
		  method: "GET",
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  }
		})
		.then((response) => response.json())
		.then(
			(responseJson) => {
				this.setState({ userInfo: responseJson });
			}
		);
	}

	changeUser = () => {
		this.setState({
			userInfo: false
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.userInfo ?
					<div className="row">
						<div className="col-sm-12">
							<ul>
								<li><strong>Name:</strong> {this.state.name}</li>
								<li><strong>Last Name:</strong> {this.state.lastName}</li>
								<li><strong>ID Number:</strong> {this.state.idNumber}</li>
								<li><strong>Birthday:</strong> {this.state.birthDay}</li>
								<li><strong>Email:</strong> {this.state.email}</li>
								<li><strong>Github User:</strong> {this.state.githubUser}</li>
							</ul>

							<button className="btn btn-outline-primary pull-right" onClick={this.changeUser}>Change User</button>

							<MaterialTable
							options={{
								pageSize: 5,
								sorting: true
							}}
							icons={{ 
					            Check: Check,
					            DetailPanel: ChevronRight,
					            Export: SaveAlt,
					            Filter: FilterList,
					            FirstPage: FirstPage,
					            LastPage: LastPage,
					            NextPage: ChevronRight,
					            PreviousPage: ChevronLeft,
					            Search: Search,
					            ThirdStateCheck: Remove
				          	}}
							columns={[
								{ title: "Name", field: "name" },
								{ title: "language", field: "language" },
								{ title: "Description", field: "description" },
								{ title: "Default Branch", field: "default_branch"},
								{ title: "Git URL", field: "git_url" }
								]}
							data={this.state.userInfo}
							title="Public Repositories"
							/>
						</div>
					</div>
				:
					<div className="row">
						<div className="col-sm-12">
							<p>No data to show, please fill out the form below</p>

							<form method="post" onSubmit={this.processUserData}>
								<div>
									<input type="text" name="name" id="name" placeholder="Name" onChange={this.handleInputChange} required />
								</div>

								<div>
									<input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.handleInputChange} required />
								</div>

								<div>
									<input type="number" name="idNumber" id="idNumber" placeholder="ID Number" min={1} onChange={this.handleInputChange} required />
								</div>

								<div>
									<input type="text" name="birthDay" id="birthDay" placeholder="Birth Date" onChange={this.handleInputChange} required />
								</div>

								<div>
									<input type="email" name="email" id="email" placeholder="Email" onChange={this.handleInputChange} required />
								</div>

								<div>
									<input type="text" name="githubUser" id="githubUser" placeholder="Github User" onChange={this.handleInputChange} required />
								</div>

								<input className="btn btn-primary" type="submit" value="Submit" />
							</form>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
}

export default User;
