import React, { useState } from "react";
import "./registration.css";
import Gun from 'gun'
import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";
const gun = Gun({
    peers: [
        'https://gunserver.onrender.com/gun'    ]
})
const RegistrationForm = () => {
    const navigation = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedOption, setSelectedOption] = useState("male");

    const checkEmailExists = async (email) => {
        try {
            
            const usersRef = gun.get('users');
            let emails = []
            await usersRef.map().get('email').on((data, key) => {
                emails.push(data)
            })
            return emails.includes(email)
        } catch (error) {
            
        }
    }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("called")
        if (firstName === "") {
            alert("First name is required");
            return;
        }
        if (lastName === "") {
            alert("Last name is required");
            return;
        }
        if (email === "") {
            alert("Email is required");
            return;
        }
        if (password === "") {
            alert("Password is required");
            return;
        }
        if (confirmPassword === "") {
            alert("Confirm password is required");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and confirm password should be same");
            return;
        }
        const isemailExists = await checkEmailExists(email)
        if (isemailExists) {
            alert("Email already exists");
            return;
        } else {
            const user = {
                firstName,
                lastName,
                email,
                password,
                gender: selectedOption,
                profilePic: faker.image.avatar()
            }
            gun.get('users').set(user);
            alert("User created successfully");
            navigation('/login')
        }







        // Implement the submit logic here
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h1>Create Account</h1>
            </div>
            <div class="form-body">
                <div class="hortizontal-group">
                    <div class="form-group left">
                        <label for="firstname" class="label-title"

                        >First name *</label>
                        <input type="text" class="form-input" placeholder="Enter your first name" required="required"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div class="form-group right">
                        <label for="lastname" class="label-title">Last name *</label>
                        <input type="text" class="form-input" placeholder="Enter your last name" required="required"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="label-title">Email</label>
                    <input type="email" class="form-input" placeholder="Enter your email" required="required"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div class="horizontal-group">

                    <div class="form-group left">
                        <label for="password" class="label-title">Password *</label>
                        <input type="password" class="form-input" placeholder="Enter your password" required="required"
                            value={password}
                            minLength={6}
maxLength={12}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div class="form-group right">
                        <label for="confirm-password" class="label-title">confirm password *</label>
                        <input type="password" class="form-input" placeholder="Enter your password again" required="required"
                            minLength={6}
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                </div>
                <div class="horizontal-group">
                    <div class="form-group left" >
                        <label
                            style={{
                                width: "100%",
                                display: "flex",

                            }}
                        >Gender:</label>
                        <div className="input-group"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <label htmlFor="male">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    id="male"
                                    checked={selectedOption === "male"}
                                    onChange={handleOptionChange}
                                />
                                Male
                            </label>
                            <label htmlFor="female">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    id="female"
                                    checked={selectedOption === "female"}
                                    onChange={handleOptionChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-footer">

                <button type="submit" class="btn">Create</button>
            </div>
        </form>
    );
};

export default RegistrationForm;
