import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import '../../SinglePage.css';
import Sort from './Sort';
import Board from '../Board';
import PostPage from '../../PostPage';
import WritePost from '../WritePost/WritePost';
import './WebtoonPage.css'

function WebtoonPage({ match }) {
    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">웹툰이야기</span>
            </div>
            <Route exact path={match.path}>
                <Sort />
                <Board json="http://168.131.30.129:2599/getBoard/webtoon" />
                <div id="button-container">
                    <Link to={`${match.path}/write`}>
                        <button>글쓰기</button>
                    </Link>
                </div>
            </Route>
            <Switch>
                <Route path={`${match.path}/write`}>
                    <WritePost json="http://168.131.30.129:2599/getBoard/webtoon" />
                </Route>
                <Route path={`${match.path}/:articleid`}>
                    <PostPage json="http://168.131.30.129:2599/getBoard/webtoon" />
                </Route>
            </Switch>
        </div>
    );
}

export default WebtoonPage;