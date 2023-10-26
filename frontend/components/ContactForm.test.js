import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render (<ContactForm/>);
});

test('renders the contact form header', () => {
    render (<ContactForm/>);

    const headerElement = screen.queryByText(/Contact Form/);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render (<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameField, '123');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.getAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/);
    userEvent.type(firstNameField, 'warren');

    const lastNameField = screen.getByLabelText(/Last Name*/);
    userEvent.type(lastNameField, 'longmire');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailField = screen.getByLabelText(/Email*/); 
    userEvent.type(emailField, 'warren@email');
    const errorMessage = await screen.findByText('Error: email must be a valid email address');
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm />);
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/);
    const lastNameField = screen.getByLabelText(/Last Name*/);
    const emailField = screen.getByLabelText(/Email*/);
    const messageField = screen.getByLabelText(/Message/);

    userEvent.type(firstNameField, 'warren');
    userEvent.type(lastNameField, 'longmire');
    userEvent.type(emailField, 'longmire@email.com');
    userEvent.type(messageField, 'warrenlongmiremessage');

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText('warren');
        const lastnameDisplay = screen.queryByText('longmire');
        const emailDisplay = screen.queryByText('longmire@email.com');
        const messageDisplay = screen.queryByText('warrenlongmiremessage');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/);
    const lastNameField = screen.getByLabelText(/Last Name*/);
    const emailField = screen.getByLabelText(/Email*/);
    const messageField = screen.getByLabelText(/Message/);

    userEvent.type(firstNameField, 'warren');
    userEvent.type(lastNameField, 'longmire');
    userEvent.type(emailField, 'longmire@email.com');
    userEvent.type(messageField, 'warrenlongmiremessage');

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText('warren');
        const lastnameDisplay = screen.queryByText('longmire');
        const emailDisplay = screen.queryByText('longmire@email.com');
        const messageDisplay = screen.queryByText('warrenlongmiremessage');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});
