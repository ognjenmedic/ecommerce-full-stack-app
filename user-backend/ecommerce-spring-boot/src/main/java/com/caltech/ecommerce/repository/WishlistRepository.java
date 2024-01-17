package com.caltech.ecommerce.repository;

import com.caltech.ecommerce.entity.Wishlist;
import com.caltech.ecommerce.entity.WishlistId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, WishlistId> {

    @Query("SELECT w FROM Wishlist w WHERE w.user.userId = :userId")
    List<Wishlist> findByUserId(@Param("userId") Long userId);
}
