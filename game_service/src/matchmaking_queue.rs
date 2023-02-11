pub struct MatchmakingQueue {
    queue: Vec<String>,
}

pub enum MatchmakingEvent {
    PlayerJoined {
        id: String,
    },
    PlayerLeft {
        id: String,
    },
    MatchMade {
        player1Id: String,
        player2Id: String,
    }
}

impl MatchmakingQueue {
    pub fn new() -> MatchmakingQueue {
        MatchmakingQueue { queue: vec![] }
    }

    pub fn apply(&mut self, event: MatchmakingEvent) {
        match event {
            MatchmakingEvent::PlayerJoined { id } => self.queue.push(id),
            MatchmakingEvent::PlayerLeft { id } => {
                self.remove_player(&id)
            },
            MatchmakingEvent::MatchMade { player1Id, player2Id } => {
                self.remove_player(&player1Id);
                self.remove_player(&player2Id);
            },
        }
    }

    fn remove_player(&mut self, id: &str) {
        match self.get_position(id) {
            Some(index) => {
                self.queue.remove(index);
            },
            None => {},
        }
    }

    pub fn get_position(&self, player_id: &str) -> Option<usize> {
        self.queue.iter().position(|x| x == player_id)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_player_joined() {
        let mut mm_queue = MatchmakingQueue::new();

        mm_queue.apply(MatchmakingEvent::PlayerJoined { id: "p1".to_owned() });

        assert_eq!(Some(0 as usize), mm_queue.get_position("p1"))
    }

    #[test]
    fn test_player_left() {
        let mut mm_queue = MatchmakingQueue::new();

        mm_queue.apply(MatchmakingEvent::PlayerJoined { id: "p1".to_owned() });
        mm_queue.apply(MatchmakingEvent::PlayerLeft { id: "p1".to_owned() });

        assert_eq!(None, mm_queue.get_position("p1"))
    }

    #[test]
    fn test_match_made() {
        let mut mm_queue = MatchmakingQueue::new();

        mm_queue.apply(MatchmakingEvent::PlayerJoined { id: "p1".to_owned() });
        mm_queue.apply(MatchmakingEvent::PlayerJoined { id: "p2".to_owned() });
        
        assert_eq!(Some(0 as usize), mm_queue.get_position("p1"));
        assert_eq!(Some(1 as usize), mm_queue.get_position("p2"));
        
        mm_queue.apply(MatchmakingEvent::MatchMade { player1Id: "p1".to_owned(), player2Id: "p2".to_owned() });

        assert_eq!(None, mm_queue.get_position("p1"));
        assert_eq!(None, mm_queue.get_position("p2"));
    }
}