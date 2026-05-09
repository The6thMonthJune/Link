package com.link.domain.trip;

import com.link.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "trips")
@Getter
@NoArgsConstructor
public class Trip extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @Column(nullable = false)
    private String tripName;

    @Column
    private String tripLocation;

    @Column(nullable = false)
    private int maxParticipants;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

}