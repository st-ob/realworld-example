<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let title = "Renewables and the countryside";
    let description = "Finding a balance in the use of land for renewables and natural habitations for climate protection.";
    let text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. /bDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. /b Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ";
    let releaseDate = "10.11.2024";
    let updateDate = "03.12.2024";
    let avatar = {
        img: '/Avatar.png',
        name: "Author Name",
        bio: "I work at statefarm",
    };
    let comments = [{
        author: {
            name: "Author Name",
            img: '/Avatar.png'
        },
        date: "03.12.2024",
        comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
    }]
</script>

<main>
    <section class="title">
        <iconify-icon icon="tabler:leaf"></iconify-icon>
    </section>
    <section class="main">
        <div class="text">
            <h1>{title}</h1>
            <span class="description">{description}</span>
            <p>{text}</p>
        </div>
        <div class="meta">
            <div class="articleInfo">
                <p>Released: {releaseDate}</p>
                <p>Updated: {updateDate}</p>
            </div>
            <div class="authorInfo">
                <div class="author">
                    <img src={avatar.img} alt={avatar.name}/>
                    <div class="authorText">
                        <p><strong>{avatar.name}</strong></p>
                        <p>{avatar.bio}</p>
                    </div>
                </div>
                <button>Follow</button>
            </div>
        </div>
    </section>
    <section class="comments">
        <h2>Comments</h2>
        {#each comments as comment}
            <div class="comment">
                <div class="commentAuthor">
                    <img src={comment.author.img} alt={comment.author.name}/>
                    <div class="metaText">
                        <p><strong>{comment.author.name}</strong></p>
                        <p>{comment.date}</p>
                    </div>
                </div>
                <p>{comment.comment}</p>
            </div>
        {/each}
    </section>
</main>

<style>
    main {
        display: flex;
        padding: 0px 10px;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        align-self: stretch;
    }
    .title {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        align-self: stretch;
        position: relative;

        border-radius: var(--rounded-3xl, 24px);
        background: url("articleImg.jpg");
    }
    iconify-icon {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    iconify-icon:hover {
        background-color: #0E9F6E;
    }
    .main {
        display: flex;
        flex: 1;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;
    }
    .text {
        display: flex;
        padding: 0px var(--3, 12px);
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;

        border-radius: var(--rounded-3xl, 24px);
    }
    h1 {
        color: var(--green-600, #057A55);

        /* shadow-sm */
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);

        /* text-4xl/font-extrabold */
        font-family: Inter;
        font-size: 36px;
        font-style: normal;
        font-weight: 800;
        line-height: 150%; /* 54px */
    }
    .description {
        align-self: stretch;

        color: #000;

        /* text-2xl/font-bold */
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 36px */
        letter-spacing: -0.24px;
    }
    .text {
        align-self: stretch;

        color: #000;

        /* text-base/font-normal */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 24px */
    }
    .meta {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
    }
    .articleInfo {
        display: flex;
        padding: 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;

        border-radius: var(--rounded-3xl, 24px);
        background: var(--green-200, #BCF0DA);
    }
    .authorInfo {
        display: flex;
        padding: 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        border-radius: var(--rounded-3xl, 24px);
        background: var(--green-200, #BCF0DA);
    }
    p {
        align-self: stretch;

        color: var(--black, #000);
        text-align: center;

        /* text-base/font-normal */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 24px */

        color: var(--black, #000);

        /* text-base/font-normal */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
    }
    button {
        align-self: stretch;

        color: var(--green-600, #057A55);
        text-align: center;

        /* text-xl/font-bold */
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 30px */
    }
    .authorText {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .comments {
        display: flex;
        padding: 12px var(--3, 12px);
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;

        border-radius: var(--rounded-3xl, 24px);
        background: var(--green-100, #DEF7EC);
    }
    h2 {
        color: var(--green-600, #057A55);

        /* shadow-sm */
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);

        /* text-4xl/font-extrabold */
        font-family: Inter;
        font-size: 36px;
        font-style: normal;
        font-weight: 800;
        line-height: 150%; /* 54px */
    }
    .comment {
        display: flex;
        padding: var(--3, 12px) var(--6, 24px);
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        border-radius: var(--rounded-3xl, 24px);
        background: var(--white, #FFF);
    }


</style>