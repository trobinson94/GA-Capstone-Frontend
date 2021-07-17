import React from "react";
import { Link } from "react-router-dom"

const Home = (props) => {
    return (
            <div class="content">
                <div className="info">
                    <h2>Blogspec</h2>
                    <h3>Express Yourself!</h3>
                    <p>Vivamus malesuada, augue a efficitur malesuada, mi lorem fringilla nibh, quis scelerisque lectus sem sit amet neque. Curabitur hendrerit lectus nec gravida dapibus. Morbi id fringilla massa. Cras a tellus dignissim, tempor nulla ut, dapibus metus. Donec ullamcorper, arcu sed vestibulum mollis, metus ante tristique sapien, sit amet fermentum est risus a nibh. Quisque laoreet tellus sit amet elit blandit consectetur. Etiam ullamcorper justo id sagittis vehicula. Phasellus eget pulvinar orci, nec porta erat. Curabitur faucibus condimentum blandit. Nam fringilla tortor vel nisi molestie, finibus rutrum mauris dignissim</p>

                    <Link to="/auth/signup">
                        <div className="info-btn">Sign Up</div>
                    </Link>
                    <Link to="/auth/login">
                        <div className="info-btn">Login</div>
                    </Link>
                </div>
                
            </div>
    )
}

export default Home