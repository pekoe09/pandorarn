import React from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { login } from '../../actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      username: this.state.username,
      password: this.state.password
    }
    await this.props.login(credentials)
  }

  render() {
    return (
      <Form inline>
        <input type="hidden" value="prayer" />
        <FormGroup>
          <FormControl
            placeholder='Username'
            name='username'
            size='mini'
            value={this.state.username}
            onChange={this.handleChange}
            style={{
              marginRight: 5
            }}
            autoComplete='off'
          />
          <FormControl
            placeholder='Password'
            name='password'
            size='mini'
            value={this.state.password}
            onChange={this.handleChange}
            style={{
              marginRight: 10
            }}
            autoComplete='off'
          />
          <Button
            type='submit'
            onClick={this.handleSubmit}
          >
            Sign in
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

const mapStateToProps = store => ({
  loggingIn: store.users.loggingIn,
  error: store.users.error
})

export default connect(
  mapStateToProps,
  {
    login
  }
)(Login)