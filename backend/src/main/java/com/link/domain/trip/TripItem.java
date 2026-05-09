package com.link.domain.trip;

import com.link.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trip_items")
@Getter
@NoArgsConstructor
public class TripItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripItemCategory category;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private String imageUrl;

    @Column
    private String address;
}
