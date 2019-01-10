import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import RaisedButton from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { post } from 'axios';
import { withRouter } from 'react-router-dom';
import CreatePublication from './graphQLComponents/CreatePublication';
import { AuthContext } from './AuthProvider';

const styles = theme => ({
    form: {
        borderRadius: '5px',
        width: '333px',
        height: 'auto',
        background: theme.palette.primary.main,
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
    },
    title: {
        marginTop: '0px',
    },
    input: {
        background: 'white',
        borderRadius: '5px',
        opacity: '0.9',
        width: '70%',
        margin: '5px 0',
    },
    button: {
        width: '50%',
        color: 'white',
        border: 'solid',
        borderWidth: 'thin',
    },
    radioGroup: {
        margin: '8px 0',
    },
    radio: {
        marginRight: '40px',
    },
});


class AddPublicationForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.parseTags = this.parseTags.bind(this);
        this.state = {
            user: '',
            title: '',
            description: '',
            content: '',
            tags: [],
            file: null,
        }
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    fileUpload(file) {
        const token = window.localStorage.getItem('token');
        //TODO : changer URL en dynamique.
        const url = 'http://localhost:2000/api/upload/images';
        const formData = new FormData();
        formData.append('imgUploader', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `bearer ${token}`,
            }
        };
        return post(url, formData, config)
    }

    parseTags(e) {
        let text = e.target.value;
        const tags = text.split(' ').filter(v => v.startsWith('#'));
        this.setState({ tags: tags });
    }

    render() {
        const { classes } = this.props;
        return (
            <AuthContext>
                {({ user_id }) => {
                    return (
                        <CreatePublication>
                            {create => {

                                let { title, description, content, tags, user } = this.state;

                                const onSubmit = (e) => {
                                    e.preventDefault();
                                    console.log(this.state.user);
                                    this.fileUpload(this.state.file).then((response) => {
                                        this.setState({ content: response.data });
                                        if (!content) {
                                            content = this.state.content;
                                        }
                                        if (!user) {
                                            user = user_id;
                                        }
                                        create({ title, description, content, tags, user })
                                            .then(() => {
                                                this.props.history.push('/feed');
                                            })
                                            .catch(
                                                console.log
                                            );
                                    });

                                };
                                return (
                                    <Paper className={classes.form} elevation={8}>
                                        <div className={classes.title}>
                                            <h2 className={classes.title}>Create Publication</h2>
                                        </div>
                                        <div>
                                            <h3>First add your content</h3>
                                            <input type="file" name="imgUploader" onChange={this.onChange} />
                                        </div>
                                        <form onSubmit={onSubmit}>
                                            <TextField
                                                label="Title"
                                                id="title"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                onChange={e => this.setState({ title: e.target.value })}
                                            /><br />
                                            <TextField
                                                label="Description"
                                                id="description"
                                                multiline={true}
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                onChange={e => this.setState({ description: e.target.value })}
                                            /><br />
                                            <p>Exemples : #Tag1 #Tag2 #Tag3</p>
                                            <TextField
                                                label="Tags"
                                                id="tags"
                                                multiline={true}
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                onChange={this.parseTags}
                                            /><br />
                                            <RaisedButton
                                                label="Submit"
                                                type="submit"
                                                className={classes.button}
                                            >Submit</RaisedButton>
                                        </form>
                                        <br />
                                    </Paper>
                                )
                            }}
                        </CreatePublication>
                    );
                }
                }
            </AuthContext>

        );
    }
}

export default withRouter(
    withStyles(styles)(
        AddPublicationForm
    )
);
