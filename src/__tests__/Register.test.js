import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';

// Redux
import { Provider } from "react-redux";
import { store } from "../redux/store";

// Components
import Register from "../pages/Register";

describe("Register form tests", () => {
	let mock;
	beforeEach(() => {
		mock = jest.spyOn(axios, 'post');
	});

	afterEach(() => {
		mock.mockRestore();
	});

	const { getByPlaceholderText, getByText, getByTestId } = render(
		<Provider store={store}>
			<Router>
				<Register />
			</Router>
		</Provider>
	);

	const fillForm = (first_name, last_name, username, email, password, confirm_password) => {

		fireEvent.change(getByPlaceholderText("first name"), {
			target: {value: first_name},
		})
		fireEvent.change(getByPlaceholderText("last name"), {
			target: {value: last_name},
		})
		fireEvent.change(getByPlaceholderText("username"), {
			target: {value: username},
		})
		fireEvent.change(getByPlaceholderText("email"), {
			target: {value: email},
		})
		fireEvent.change(getByPlaceholderText("password"), {
			target: {value: password},
		})
		fireEvent.change(getByPlaceholderText("confirm password"), {
			target: {value: confirm_password},
		})
	}

	it("renders form correctly", () => {
	
		expect(getByPlaceholderText("first name")).toBeInTheDocument();
		expect(getByPlaceholderText("last name")).toBeInTheDocument();
		expect(getByPlaceholderText("username")).toBeInTheDocument();
		expect(getByPlaceholderText("email")).toBeInTheDocument();
		expect(getByPlaceholderText("password")).toBeInTheDocument();
		expect(getByPlaceholderText("confirm password")).toBeInTheDocument();
		expect(getByText("Register").closest('button')).toBeInTheDocument();
		expect(getByText("I already have an account")).toBeInTheDocument();

	})

	it("will call register endpoint if all fields are filled correctly", async () => {
		render(
			<Provider store={store}>
				<Router>
					<Register />
				</Router>
			</Provider>
		);

		fillForm("Test", "User", "TestUser", "test@user.com", "12345678", "12345678")

		const user = {
			first_name: getByPlaceholderText("first name").value,
			last_name: getByPlaceholderText("last name").value,
			username: getByPlaceholderText("username").value,
			email: getByPlaceholderText("email").value,
			password: getByPlaceholderText("password").value,
			confirm_password: getByPlaceholderText("confirm password").value
		}

		const result = { data: { user: user, token: '12345' }}

		mock.mockResolvedValue(result);
		fireEvent.submit(getByTestId("register-form"))
		await wait(() => expect(mock).toHaveBeenCalledWith('/auth/register', user));

	});

	it("won't register if passwords don't match", async () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Router>
					<Register />
				</Router>
			</Provider>
		);
		
		fillForm("Test", "User", "TestUser", "test@user.com", "12345678", "12345679")

		fireEvent.submit(getByTestId("register-form"))
		await wait(() => expect(mock).not.toHaveBeenCalled());
	});

	it("won't register if password is less than 8 characters", async () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Router>
					<Register />
				</Router>
			</Provider>
		);
		
		fillForm("Test", "User", "TestUser", "test@user.com", "1234567", "1234567")

		fireEvent.submit(getByTestId("register-form"))
		await wait(() => expect(mock).not.toHaveBeenCalled());
	});
})