import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile(props) {
    const [edit, setEdit] = useState(false);
    const [username, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        let config = {
            headers: {
                authtoken: localStorage.getItem('token')
            }
        }
        axios.get(props.api, config)
        .then(res => {
            const userInfo = res.data.data;
            setName(userInfo.username);
            setAlias(userInfo.alias);
            setGenre(userInfo.favorite_genre);
        })
        .catch(err => {
            console.log(err);
        })
    }, [props.api]);

    const onChangeAlias = e => {
        edit && setAlias(e.target.value);
    }
    const onChangeGenre = e => {
        edit && setGenre(e.target.value);
    }

    const submit = () => {
        let data = {
            alias: alias,
            favorite_genre: genre
        }
        let config = {
            headers: {
                authtoken: localStorage.getItem('token')
            }
        }
        axios.put(props.api, data, config)
        .then(res => {
            setEdit(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <section className="profile-wrap">
            <br/>
            <br/>
            <table cellPadding="10">
                <tbody>
                    <tr>
                        <td><mark>이메일</mark></td>
                        <td>{username}</td>
                    </tr>
                    <tr>
                        <td><mark>닉네임</mark></td>
                        <td>
                            <input type="text" value={alias} onChange={onChangeAlias} />
                        </td>
                    </tr>
                    <tr>
                        <td><mark>좋아하는 장르</mark></td>
                        <td>
                            <input type="text" value={genre} onChange={onChangeGenre} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="button-container">
                {
                    !edit ? (
                        <button id="edit" onClick={() => setEdit(true)}>수정하기</button>
                    ) : (
                        <button id="confirm" onClick={submit}>확인</button>
                    )
                }
            </div>
            <br/>
        </section>
    );
}

export default UserProfile;