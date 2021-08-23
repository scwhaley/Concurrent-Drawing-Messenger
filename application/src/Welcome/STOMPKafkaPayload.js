class STOMPKafkaPayload {
    topic;
    key;
    value;

    constructor(topic, key, value){
        this.topic = topic;
        this.key = key;
        this.value = value;
    }
}

export default STOMPKafkaPayload;