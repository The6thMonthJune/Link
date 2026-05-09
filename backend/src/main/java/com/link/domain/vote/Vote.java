package com.link.domain.vote;

import com.link.domain.common.BaseEntity;
import com.link.domain.trip.TripItem;
import com.link.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "votes")
@Getter
@NoArgsConstructor
public class Vote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_item_id", nullable = false)
    private TripItem tripItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
