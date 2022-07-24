export interface Track {
    name:     string;
    album:    string;
    cover:    string;
    artist:   Artist;
    duration: Duration;
    mediaId:  string;
}

export interface Artist {
    name:        string;
    nickname:    string;
    nationality: string;
}

export interface Duration {
    start: number;
    end:   number;
}
