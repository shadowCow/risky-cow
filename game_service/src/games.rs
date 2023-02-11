
#[derive(PartialEq, Eq, Debug, Clone)]
struct Game {
    id: String,
    player_1_id: String,
    player_2_id: String,
}

struct Games {
    games: Vec<Game>,
}

enum GamesEvent {
    GameCreated { 
        game: Game,
    },
    GameEnded {
        id: String,
    }
}

impl Games {
    pub fn new() -> Games<> {
        Games {
            games: vec![],
        }
    }

    pub fn apply(&mut self, event: GamesEvent) {
        match event {
            GamesEvent::GameCreated { game } => {
                self.games.push(game);
            },
            GamesEvent::GameEnded { id } => {
                match self.games.iter().position(|x| x.id == id) {
                    Some(index) => {
                        self.games.remove(index);
                    },
                    None => {}
                }
            }
        }
    }

    pub fn get_game_by_player_id(&self, player_id: &str) -> Option<&Game> {
        self.games.iter().find(|x| x.player_1_id == player_id || x.player_2_id == player_id)   
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_game_created() {
        let mut games = Games::new();

        let player_1_id = "p1".to_owned();
        let player_2_id = "p2".to_owned();
        let game = Game {
            id: "g1".to_owned(),
            player_1_id: player_1_id.clone(),
            player_2_id: player_2_id.clone(),
        };

        games.apply(GamesEvent::GameCreated { game: game.clone() });

        assert_eq!(Some(&game), games.get_game_by_player_id(&player_1_id));
        assert_eq!(Some(&game), games.get_game_by_player_id(&player_2_id));
    }

    #[test]
    fn test_game_ended() {
        let mut games = Games::new();

        let player_1_id = "p1".to_owned();
        let player_2_id = "p2".to_owned();
        let game_id = "g1".to_owned();
        let game = Game {
            id: game_id.clone(),
            player_1_id: player_1_id.clone(),
            player_2_id: player_2_id.clone(),
        };

        games.apply(GamesEvent::GameCreated { game: game.clone() });
        games.apply(GamesEvent::GameEnded { id: game_id });

        assert_eq!(None, games.get_game_by_player_id(&player_1_id));
        assert_eq!(None, games.get_game_by_player_id(&player_2_id));
    }
}
