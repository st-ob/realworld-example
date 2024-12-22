<script lang="ts">
	import type { PageData } from "./$types";

    let {data} : {data: PageData} = $props();
    let tags = $state<string[]>(data.tags?.map(({name}) => name) ?? []);
    let tag = $state("");

    const handleTagSubmit = (e: KeyboardEvent) => {
        if(e.key === "Enter") {
            e.preventDefault();
            if(!tags.includes(tag)) {
                tags.push(tag);
            }
            tag = "";
        }
    }

    const handleTagDeletion = (index: number) => {
        tags.splice(index, 1);
    }
</script>

<div class="editor-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
                <ul class="error-messages">
                    <li>That title is required</li>
                </ul>
        
                <form method="POST">
                    <fieldset>
                        <fieldset class="form-group">
                            <input 
                                type="text" 
                                class="form-control form-control-lg" 
                                name="title" 
                                placeholder="Article Title" 
                                value={data.article?.title ?? ""} 
                                required/>
                        </fieldset>
                        <fieldset class="form-group">
                            <input 
                                type="text" 
                                class="form-control" 
                                name="description" 
                                placeholder="What's this article about?" 
                                value={data.article?.description ?? ""} 
                                required/>
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea
                                class="form-control"
                                rows="8"
                                name="body"
                                placeholder="Write your article (in markdown)"
                                value={data.article?.body ?? ""}
                                required
                            ></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control" placeholder="Enter tags" bind:value={tag} onkeypress={handleTagSubmit} />
                            <div class="tag-list">
                                {#each tags as item, index}
                                <!-- svelte-ignore a11y_click_events_have_key_events -->
                                <span class="tag-default tag-pill">
                                    <i class="ion-close-round" role="button" tabindex="0" onclick={() => handleTagDeletion(index)}></i>
                                    {item}
                                </span>
                                {/each}
                            </div>
                            <input type="hidden" name="tagList" value={tags}>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>