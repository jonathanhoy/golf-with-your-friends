import React, { Component } from 'react';
import { Card, CardList } from '../styles/Card';
import Wrapper from '../styles/Wrapper';
import PageHeading from '../styles/PageHeading';
import { firebase, wins } from '../firebase';
import { byWinPercentage } from '../sortingFunctions';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      wins: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref(`${wins}`);
    dbRef.on('value', (response) => {
      const data = response.val();
      console.log(data);
      // Sort data to get latest tournament
      const sortedData = data.sort(byWinPercentage);
      let newWins = {};
      // eslint-disable-next-line
      const filteredWins = sortedData.filter((item) => {
          if (item !== null) {
              return item;
          };
      })
      newWins = filteredWins;
      this.setState({
        wins: newWins,
      })
    });
  }

  render() {
    return (
      <Wrapper>
        <PageHeading>Wins</PageHeading>
        <CardList>
          <Card>
            <table className="wins">
              <tbody>
                <tr>
                  <th>Player</th>
                  <th>Wins</th>
                  <th>Tournaments played</th>
                  <th>Win %</th>
                </tr>
                {
                  this.state.wins.map((player) => {
                    return (
                      <tr>
                        <td>{player.player}</td>
                        <td>{player.total_wins}</td>
                        <td>{player.games_played}</td>
                        <td>{(player.win_rate).toFixed(3)}</td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          </Card>
        </CardList>
      </Wrapper>
    )
  }
}

export default Leaderboard;